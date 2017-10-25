class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if( @user.save )
      # success! login the new user
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def chatrooms
    if (current_user)
      @chatrooms = current_user.chatroom_memberships
      render "/api/chatrooms/index"
    else
      render json: "Must be logged in", status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:email_address, :username, :password)
  end

end
