class PageSerializer < ActiveModel::Serializer
  attributes :id, :author, :content
  belongs_to :book
end
