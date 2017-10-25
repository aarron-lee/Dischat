class CreateMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :members do |t|
      t.integer :chatroom_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end

    add_index :members, :user_id
    add_index :members, :chatroom_id

  end
end
