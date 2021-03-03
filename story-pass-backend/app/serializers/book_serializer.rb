class BookSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :pages
end
