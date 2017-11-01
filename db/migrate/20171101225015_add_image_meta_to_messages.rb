class AddImageMetaToMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :messages, :image_meta, :text
  end
end
