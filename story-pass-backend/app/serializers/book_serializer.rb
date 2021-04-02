class BookSerializer < ActiveModel::Serializer
  # allows nested JSON attributes
  attributes :id, :title
  has_many :pages
end
