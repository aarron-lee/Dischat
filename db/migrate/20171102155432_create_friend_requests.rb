class CreateFriendRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :friend_requests do |t|
      t.integer :user_from_id, null: false
      t.integer :user_to_id, null: false
      t.boolean :approved, null: false, default: false
      t.timestamps
    end
    add_index :friend_requests, :user_from_id
    add_index :friend_requests, :user_to_id
  end
end
