class CreateFriends < ActiveRecord::Migration[5.1]
  def change
    create_table :friends do |t|
      t.integer :user_id, null: false
      t.integer :friend_id, null: false
      t.integer :channel_id, null: false
      t.timestamps
    end
    add_index :friends, :user_id
    add_index :friends, :friend_id
    add_index :friends, :channel_id
  end
end
