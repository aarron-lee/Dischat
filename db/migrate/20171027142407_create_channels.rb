class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.integer :chatroom_id, null: false
      t.text :description
      t.timestamps
    end
    add_index :channels, :chatroom_id
  end
end
