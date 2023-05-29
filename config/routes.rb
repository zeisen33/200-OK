Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get 'api/search', to: 'api/questions#search'
  post 'api/test', to: 'application#test'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :destroy, :index]
    resource :session, only: [:show, :create, :destroy]
    # resources :questions
    resources :questions, only: [:index, :create, :show, :update, :destroy]
    resources :answers, only: [:index, :show, :create, :update, :destroy]
    resources :answer_votes, only: [:index, :show, :create, :update, :destroy]
    ## Don't need to nest answers under questions because I will have questionId when I need it
  end

  get '*path', to: "static_pages#frontend_index"
end
