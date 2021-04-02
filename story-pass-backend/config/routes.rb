Rails.application.routes.draw do
  # enables create and show routes for pages
  resources :pages, only: [:create, :show]
  # enables create, show, and index routes for books
  resources :books, only: [:create, :show, :index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
