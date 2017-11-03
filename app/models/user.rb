class User < ApplicationRecord
  validates :email_address, :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_attached_file :avatar, styles: { thumb: "50x50>" }, default_url: "default-avatar.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

#--------------
  has_many :chatrooms_owned,
  foreign_key: :owner_id,
  class_name: :Chatroom

  has_many :members,
  foreign_key: :user_id,
  class_name: :Member

  has_many :chatroom_memberships,
  through: :members,
  source: :chatroom

  has_many :messages,
  foreign_key: :author_id,
  class_name: :Message

  has_many :friend_ids,
  foreign_key: :user_id,
  class_name: :Friend

  has_many :friends,
  through: :friend_ids,
  source: :friend

  has_many :friend_channels,
  through: :friend_ids,
  source: :channel



  has_many :requested_friends_ids,
  foreign_key: :user_from_id,
  class_name: :FriendRequest

  has_many :pending_friends_ids,
  foreign_key: :user_to_id,
  class_name: :FriendRequest

  has_many :requested_friends,
  through: :requested_friends_ids,
  source: :user_to

  has_many :pending_friends,
  through: :pending_friends_ids,
  source: :user_from




#--------------

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
