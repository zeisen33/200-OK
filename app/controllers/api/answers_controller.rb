class Api::AnswersController < ApplicationController
    def index
        @answers = Answer.all.includes(:answer_author, :question)
        render :index
    end

    def show
        @answer = Answer.find(params[:id])
        # @answer_author = User.find(@answer.answer_author_id)
        render :show
    end

    def create
        @answer = Answer.new(answer_params)
        @answer.author = current_user
        if @answer.save
            render :show
        else
            render json: { errors: @answer.errors.full_messages }
        end
    end

    def update

    end

    def destroy

    end

    private
    def answer_params
        params.require(:answer).permit(:body)
    end
end
