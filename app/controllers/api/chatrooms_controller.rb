class Api::ChatroomsController < ApplicationController

  before_action :ensure_logged_in, only: [:create, :update, :index]

  before_action only: [:update, :index, :create] do
    ensure_correct_owner(params[:chatroom][:owner_id])
  end


  def create

  end

  def update
    @chatroom = Chatroom.find(params[:id])

    if (@chatroom )
      # chatroom exists
      if (@chatroom.owner_id != chatroom_params[:owner_id])
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

  end


  def index

  end

  private
  def chatroom_params
    params.require(:chatroom).permit(:owner_id, :title)
  end

end
