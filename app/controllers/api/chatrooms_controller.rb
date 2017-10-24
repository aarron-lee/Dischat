class Api::ChatroomsController < ApplicationController

  def create

  end

  def update

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
