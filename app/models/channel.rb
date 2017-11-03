class Channel < ApplicationRecord
  validates :name, presence: true

  validates :chatroom, presence: true, allow_nil: true

  validates :name, length: {maximum: 20}
  validates :description, length: {maximum: 150}

  after_initialize :ensure_description


  belongs_to :chatroom,
  foreign_key: :chatroom_id,
  class_name: :Chatroom,
  optional: true

  has_many :messages,
  foreign_key: :channel_id,
  class_name: :Message

  private

  def ensure_description
    self.description ||= ''
  end

end
