class User < ApplicationRecord
  validates :email_address, :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token


  def self.find_by_credentials(email_address, pass)
    @user = User.find_by(email_address: email_address)

    if(@user && @user.is_password?(pass))
      # user found!
      return @user
    else
      return nil
    end
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def is_password?(pass)
    current_pass_digest = BCrypt::Password.new(self.password_digest)
    current_pass_digest.is_password?(pass)
  end


  def password=(pass)
    @password = pass
    self.password_digest = BCrypt::Password.create(pass)
  end


  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end


end
