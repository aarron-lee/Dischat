class Api::ChatroomsController < ApplicationController

  before_action :ensure_logged_in, only: [:create, :update, :index, :show, :join]

  before_action only: [:update, :index] do
    ensure_correct_owner(params[:chatroom][:owner_id])
  end


  def create
    @chatroom = Chatroom.new(chatroom_params)
    @chatroom[:owner_id] = current_user.id


    begin
      ActiveRecord::Base.transaction do
        @chatroom.save!
        @member = Member.new( user_id: current_user.id, chatroom_id: @chatroom.id )
        @member.save!
        @channel = Channel.new( name: "general", chatroom_id: @chatroom.id, description: "")
        @channel.save!
      end
      render :show, status: 200
    rescue ActiveRecord::RecordInvalid => _invalid
      render json: @chatroom.errors.full_messages, status: 400
    end

  end

  def update
    @chatroom = Chatroom.find(params[:id])

    if (@chatroom )
      # chatroom exists
      if (@chatroom.owner_id != chatroom_params[:owner_id].to_i)
        return render json: "You do not own this chatroom", status: 401
      end
      @chatroom.update_attributes(chatroom_params)
      if(@chatroom.save)
        render :show
      else
        render json: @chatroom.errors.full_messages, status: 400
      end
    else
      render json: "Chatroom does not exist", status: 400
    end
  end

  def show
    if params[:id].nil?
      return render json: "Chatroom doesn't exist", status: 400
    end
    @chatroom = Chatroom.find(params[:id])

    if(@chatroom)
      render :show, status: 200
    else
      render json: "Chatroom does not exist", status: 400
    end
  end

  def members
    @chatroom = Chatroom.includes(:memberships).find(params[:id])

    if(@chatroom)
      @users = @chatroom.memberships
      render "/api/users/index"
    else
      render json: "Chatroom does not exist", status: 400
    end
  end

  def join
    if( params[:id].nil? )
      return render json: "Invalid Chatroom", status: 400
    end

    @chatroom
    begin
      @chatroom = Chatroom.find(params[:id])
    rescue ActiveRecord::RecordNotFound => _invalid
      return render json: "Chatroom does not exist", status: 400
    end

    if(@chatroom)

      @member = Member.new( chatroom_id: @chatroom.id, user_id: current_user.id )
      if(@member.save)
        @chatroom = Chatroom.includes(:members, :channels).find(params[:id])
        render "/api/chatrooms/join"
      else
        render json: @member.errors.full_messages, status: 400
      end
    else

      render json: "Chatroom does not exist", status: 400
    end

  end

  def channels
    if( params[:id].nil? )
      return render json: "Invalid Chatroom", status: 400
    end

    @chatroom
    begin
      @chatroom = Chatroom.find(params[:id])
    rescue ActiveRecord::RecordNotFound => _invalid
      return render json: "Chatroom does not exist", status: 400
    end

    if @chatroom
      @channels = Chatroom.includes(:channels).find(@chatroom.id).channels #@chatroom.channels
      render "/api/channels/index"
    else
      render json: "Chatroom does not exist", status: 400
    end
  end

  private
  def chatroom_params
    params.require(:chatroom).permit(:owner_id, :title)
  end

end
