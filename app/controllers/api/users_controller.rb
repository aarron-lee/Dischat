class Api::UsersController < ApplicationController

  before_action :ensure_logged_in, only: [:current]


  def create
    @user = User.new(user_params)
    if( @user.save )
      # success! login the new user
      login(@user)
      defaultMessagesAndFriends()
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


  def defaultMessagesAndFriends
    addDefaultFriend()
    addDefaultMessages()
    addDefaultChatroom()
  end

  def addDefaultChatroom
    @member = Member.new( chatroom_id: 1, user_id: @user.id )
    @member.save
    @member = Member.new( chatroom_id: 2, user_id: @user.id )
    @member.save
  end

  def addDefaultMessages
    # @channel
    @message = Message.new(channel_id: @channel.id, body: "Hey there, Welcome to Dischat!")
    @message.author_id = @user2.id
    @message.save

    @message = Message.new(channel_id: @channel.id, body: "Feel free to explore around, you can check out a few random chatrooms I made, you'll see it to the left under the 'DM' button")
    @message.author_id = @user2.id
    @message.save


    @message = Message.new(channel_id: @channel.id, body: "If you want to join other chatrooms, or make your own, use the '+' button in the left column.")
    @message.author_id = @user2.id
    @message.save


    @message = Message.new(channel_id: @channel.id, body: "You can Direct Message other users either by username, or userID. Just click on the 'Find or start a conversation' button")
    @message.author_id = @user2.id
    @message.save


    @message = Message.new(channel_id: @channel.id, body: "If you want to contact me, you can check out my site at:  http://www.aarronlee.com")
    @message.author_id = @user2.id
    @message.save


    @message = Message.new(channel_id: @channel.id, body: "Enjoy 👍")
    @message.author_id = @user2.id
    @message.save

  end

  def addDefaultFriend
    @user2 = User.find_by(username: "aarron")

    @f1 = Friend.new
    @f2 = Friend.new

    @f1.user_id = @user.id
    @f1.friend_id = @user2.id

    @f2.user_id = @user2.id
    @f2.friend_id = @user.id

    @channel = Channel.new
    @channel.name= "#{@user.id}_friend_#{@user2.id}"

    begin
      ActiveRecord::Base.transaction do
        @channel.save!
        @f1.channel_id = @channel.id
        @f2.channel_id = @channel.id
        @f1.save!
        @f2.save!
      end
      # success! return channel and other user info
    rescue ActiveRecord::RecordInvalid => _invalid

    end
  end

end
