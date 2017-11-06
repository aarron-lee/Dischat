class Message < ApplicationRecord
  validates :author_id, :channel_id, :body, presence: true

  validates :body, length: {minimum: 1, maximum: 250 }

  belongs_to :author,
  foreign_key: :author_id,
  class_name: :User

  belongs_to :channel,
  foreign_key: :channel_id,
  class_name: :Channel


  has_attached_file :image, styles: { medium: "500x500>" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

end
