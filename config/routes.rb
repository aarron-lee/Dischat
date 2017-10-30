Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create] do
      get 'chatrooms', on: :collection
    end
    resource :sessions, only: [:create, :destroy]
    resources :chatrooms, only: [:create, :update, :show] do
      get 'members', on: :member
      post 'join', on: :member
      post 'join', on: :collection

      get 'channels', on: :member
    end

    resources :messages, only: [:create, :update, :destroy]

    resources :channels, only: [:create, :update] do
      get 'messages', on: :member
    end


  end

end
