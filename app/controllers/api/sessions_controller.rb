class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      session_params[:email_address],
      session_params[:password]
    )

    if( @user )
      # User exists, credentials work!
      # login user
      login(@user)
      render :show, status: 200
    else
      render json: "Invalid Login Credentials", status: 401
    end
  end


  def destroy
    @user = current_user
    if (@user)
      # user exists, logout
      @user.reset_session_token
      session[:session_token] = nil
      render json: {}, status: 200
    else
      render json: "Not Logged In, Invalid request", status: 404
    end
  end

  private
  def session_params
    params.require(:user).permit(:username, :password, :email_address)
  end

end
