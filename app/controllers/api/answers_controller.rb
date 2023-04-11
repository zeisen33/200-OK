class Api::AnswersController < ApplicationController
    wrap_parameters include: Answer.attribute_names + ['authorId', 'questionId']
    
    def index
        @answers = Answer.all.includes(:answer_author, :question)
        render :index
    end

    def show
        @answer = Answer.find_by(id: params[:id])
        # @answer_author = User.find(@answer.answer_author_id)
        render :show
    end

    def create
        @answer = Answer.new(answer_params)
        # debugger
        # author = current_user
        # ## how do i get @answer[:question_id] and @answer[], which it needs
        # @answer[:author_id] = author.id
        if @answer.save
            render :show
        else
            render json: { errors: @answer.errors.full_messages }
        end
    end

    def update
        @answer = Answer.find_by(id: params[:id])
        # debugger
        @current_user = current_user
        if @answer.answer_author.id == @current_user.id 
            if @answer.update(answer_params)
                render :show
            else
                render json: { errors: @answer.errors.full_messages }
            end
        end
    end

    def destroy
        @answer = Answer.find_by(id: params[:id])
        @current_user = current_user
        if @answer.answer_author.id == @current_user.id
            @answer.destroy
        end
    end

    private
    def answer_params
        params.require(:answer).permit(:body, :question_id, :author_id)
    end
end
