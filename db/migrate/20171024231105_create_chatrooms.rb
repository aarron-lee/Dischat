class CreateChatrooms < ActiveRecord::Migration[5.1]
  def change
    create_table :chatrooms do |t|
      t.string :title, null: false
      t.integer :owner_id, null: false
      t.timestamps
    end
    add_index :chatrooms, :owner_id
  end
end
