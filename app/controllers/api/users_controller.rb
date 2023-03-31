class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password', "displayName"]

  def index 
    @users = User.all 
    render :index
  end

  def show
    @user = User.find_by(id: params[:id])
    render :show
  end

  def create
    # debugger
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render "api/users/show"
    else
      render json: { errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :display_name, :password)
  end
end

