class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :finished
  has_many :pages
end
