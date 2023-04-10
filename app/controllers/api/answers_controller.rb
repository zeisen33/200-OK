class Api::AnswersController < ApplicationController
    def index
        @answers = Answer.all.includes(:answer_author, :question:)
        render :index
    end

    def show
        @answer = Answer.find(params[:id])
        render json: @answer
    end

    def create

    end

    def update

    end

    def destroy

    end

    private

end
