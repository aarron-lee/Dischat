class AddAvatarMetaToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :avatar_meta, :text
  end
end
