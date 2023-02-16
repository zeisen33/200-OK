class Api::QuestionsController < ApplicationController
    wrap_parameters include: Question.attribute_names + ['askerId']

    def index
        # debugger
        @questions = Question.all
        render :index
    end

    def show
        @question = Question.find_by(id: params[:id])
        render json: @question
    end

    def new
        @question = Question.new(question_params)
        @question.asker_id = current_user
        render json: @question
    end

    def create
        @question = Question.new(question_params)
        @question.asker_id = current_user
        if @question.save 
            render json: @question
        else 
            render json: { errors: @question.errors.full_messages}
        end
    end

    def edit
        @question = Question.find_by(id: params[:id])
        @current_user = current_user
        if @question.asker.id == @current_user.id
            render json: @question
        end
    end

    def update
        @question = Question.find_by(id: params[:id])
        @current_user = current_user
        if @question.asker.id == @current_user.id
            if @question.update
                render json: @question
            else
                 render json: { errors: @question.errors.full_messages}
            end
        end
    end

    def destroy
        @question = Question.find_by(id: params[:id])
        @current_user = current_user
        if @question.asker.id == @current_user.id
            @question.delete
        end
    end

    private
    def question_params
        params.require(:question).permit(:title, :body)
    end
end
