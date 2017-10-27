class Api::ChannelsController < ApplicationController

  before_action :ensure_logged_in, only: [:create, :update]


  #create channel
  def create
    @channel = Channel.new(channel_params)

    if(@channel.save)
      render :show, status: 200
    else
      render json: @channel.errors.full_messages, status: 400
    end
  end

  #TODO get messages for channel


  # update channel name or description
  def update
    @channel = Channel.find(params[:id])

    if(@channel)
      @channel.update_attributes(channel_params)
      if(@channel.save)
        render :show, status: 200
      else
        render json: @channel.errors.full_messages, status: 401
      end
    else
      render json: "Channel doesn't exist", status: 400
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :chatroom_id, :description)
  end

end
