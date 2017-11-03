class Api::FriendsController < ApplicationController

  before_action :ensure_logged_in

  def index
    render :index, status: 200
  end

  def create
    @user1 = current_user
    @user2

    if params[:username]
      begin
        @user2 = User.find_by(username: params[:username])
      rescue ActiveRecord::RecordNotFound => _invalid
        return render json: "User does not exist", status: 400
      end
    elsif params[:id]
      begin
        @user2 = User.find(params[:id])
      rescue ActiveRecord::RecordNotFound => _invalid
        return render json: "User does not exist", status: 400
      end
    else
      return render json: "no id provided", status: 422
    end



    if @user2
      # user2 found, time to make some friends!
      @f1 = Friend.new
      @f2 = Friend.new

      @f1.user_id = @user1.id
      @f1.friend_id = @user2.id

      @f2.user_id = @user2.id
      @f2.friend_id = @user1.id

      @channel = Channel.new
      @channel.name= "#{@user1.id}_friend_#{@user2.id}"

      begin
        ActiveRecord::Base.transaction do
          @channel.save!
          @f1.channel_id = @channel.id
          @f2.channel_id = @channel.id
          @f1.save!
          @f2.save!
        end
        # success! return channel and other user info
        render :create, status: 200
      rescue ActiveRecord::RecordInvalid => invalid
        render json: invalid , status: 400
      end

    else
      render json: "Cannot Find User you are trying to message", status: 422
    end


  end

end
