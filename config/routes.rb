Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :destroy, :index]
    resource :session, only: [:show, :create, :destroy]
    # resources :questions
    resources :questions, only: [:index, :create, :update, :destroy]
    resources :questions, only: [:show] do 
      resources :answers, only: [:index, :show, :create, :update, :destroy]
    end
  end

  get '*path', to: "static_pages#frontend_index"
end
