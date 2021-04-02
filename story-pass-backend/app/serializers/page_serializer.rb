class PageSerializer < ActiveModel::Serializer
  # allows nested JSON attributes
  attributes :id, :author, :content
  belongs_to :book
end
