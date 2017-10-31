class Channel < ApplicationRecord
  validates :name, :chatroom_id, presence: true

  after_initialize :ensure_description


  belongs_to :chatroom,
  foreign_key: :chatroom_id,
  class_name: :Chatroom

  has_many :messages,
  foreign_key: :channel_id,
  class_name: :Message

  private

  def ensure_description
    self.description ||= ''
  end

end
