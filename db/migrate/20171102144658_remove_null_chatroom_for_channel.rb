class RemoveNullChatroomForChannel < ActiveRecord::Migration[5.1]
  def change
    change_column_null :channels, :chatroom_id, true
  end
end
