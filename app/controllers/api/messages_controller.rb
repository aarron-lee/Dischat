class Api::MessagesController < ApplicationController

  before_action :ensure_logged_in, only: [:create, :update, :destroy]

  # before_action only: [:update, :destroy] do
  #   ensure_correct_owner(params[:message][:author_id])
  # end

  def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id

    if(@message.save)
      Pusher.trigger('channel_messages_' + @message.channel_id.to_s,
        'message_published', {
          id: @message.id,
          author_id: @message.author_id,
          channel_id: @message.channel_id,
          body: @message.body,
          created_at: @message.created_at,
          image_exists: @message.image.exists?,
          image_url: @message.image.url(:medium)
        })

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
    params.require(:message).permit(:channel_id, :body, :image)
  end

end
