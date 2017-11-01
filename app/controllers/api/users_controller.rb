class Api::UsersController < ApplicationController

  before_action :ensure_logged_in, only: [:current]


  def create
    @user = User.new(user_params)
    if( @user.save )
      # success! login the new user
      login(@user)
      @chatroom_memberships = User.includes(:chatroom_memberships).find(@user.id).chatroom_memberships #@user.chatroom_memberships
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def current
    @user = current_user

    @user.update_attributes(user_params)

    if(@user.save)
      render :show, status: 200
    else
      render json: @user.errors.full_messages, status: 422
    end

  end

  def chatrooms
    if (current_user)
      @chatrooms = User.includes(:chatroom_memberships, :members).find(current_user.id).chatroom_memberships
      #current_user.chatroom_memberships
      render "/api/chatrooms/index"
    else
      render json: "Must be logged in", status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:email_address, :username, :password, :avatar)
  end

end
