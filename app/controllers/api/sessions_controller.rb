class Api::SessionsController < ApplicationController
  def show
    # banana
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: { user: nil }
    end
  end

  def create
    email = params[:email]
    password = params[:password]

    @user = User.find_by_credentials(email, password)
    # debugger
    if @user
      login!(@user)
      render "api/users/show"
    else
      render json: { errors: ['The provided credentials were invalid']}, status: :unauthorized
    end
  end

  def destroy
    logout!
    render json: { message: 'success'}
  end
end