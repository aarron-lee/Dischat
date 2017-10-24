class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logout_current_user, :logged_in?, :login

  def current_user
    @current_user ||= User.find_by( session_token: session[:session_token] )
  end

  def logout_current_user
    if(logged_in?)
      current_user.reset_session_token
      current_user.save!
      session[:session_token] = nil
    end
  end


  def logged_in?
    !!current_user
  end

  def login(user)
    session[:session_token] = user.reset_session_token
  end



end
