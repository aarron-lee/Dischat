class RemoveNullChatroomContraintForChannel < ActiveRecord::Migration[5.1]
  def change
    change_column :channels, :chatroom_id, :integer, :null => true
  end
end
