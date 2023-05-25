class Api::QuestionsController < ApplicationController
    wrap_parameters include: Question.attribute_names + ['askerId']

    def index
        # debugger
        @questions = Question.all.includes(:asker)
        # @users = User.all
        render :index
    end

    def show
        @question = Question.find_by(id: params[:id])
        # debugger
        # @user = User.find_by(id: @question.asker_id)

        render :show
    end

    def create
        @question = Question.new(question_params)
        @question.asker = current_user
        if @question.save 
            render :show
        else 
            render json: { errors: @question.errors.full_messages}
        end
    end

    # def edit
    #     @question = Question.find_by(id: params[:id])
    #     @current_user = current_user
    #     if @question.asker.id == @current_user.id
    #         render json: @question
    #     end
    # end

    def update
        # debugger
        @question = Question.find_by(id: params[:id])
        @current_user = current_user
        # debugger
        if @question.asker.id == @current_user.id
            if @question.update(question_params)
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
            @question.destroy
        end
    end

    def search
        query = params['q']
        if query == '' 
            @questions = Question.all 
        else
            @questions = Question.where("LOWER(title) LIKE LOWER('%#{query}%')")
        end
        render :index
    end

    private
    def question_params
        params.require(:question).permit(:title, :body)
    end
end
