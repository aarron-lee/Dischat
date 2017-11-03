class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logout_current_user, :logged_in?, :login, :ensure_correct_owner, :ensure_logged_in

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

  def ensure_logged_in
    if !logged_in?
      return render json: "Not logged in, cannot perform action", status: 403
    end
  end


  def ensure_correct_owner(id)
    user = User.find(id)
    if current_user.id != user.id
      return render json: "Invalid user, cannot perform action", status: 401
    end
  end



end
