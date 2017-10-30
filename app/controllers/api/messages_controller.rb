class Api::MessagesController < ApplicationController

  before_action :ensure_logged_in, only: [:create, :update, :destroy]

  # before_action only: [:update, :destroy] do
  #   ensure_correct_owner(params[:message][:author_id])
  # end

  def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id

    if(@message.save)
      # TODO: websockets
      render :show
    else
      render json: @message.errors.full_messages , status: 422
    end

  end

  def update
    @message = Message.find(params[:id])

    if @message.nil?
      return render json: "Message not found", status: 422
    end

    if current_user.id != @message.author_id
      return render json: "Invalid permissions, cannot perform action", status: 401
    end

    @message.update_attributes(message_params)

    if(@message.save)
      # TODO: websockets
      render :show
    else
      render json: @message.errors.full_messages , status: 422
    end
  end

  def destroy
    @message = Message.find(params[:id])

    if @message.nil?
      return render json: "Message not found", status: 422
    end

    if current_user.id != @message.author_id
      return render json: "Invalid permissions, cannot perform action", status: 401
    end

    if(@message.destroy)
      # TODO: websockets
      render :show
    else
      render json: @message.errors.full_messages , status: 422
    end

  end



  private
  def message_params
    params.require(:message).permit(:channel_id, :body)
  end

end
