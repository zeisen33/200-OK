class ApplicationController < ActionController::API

    rescue_from StandardError, with: :unhandled_error
    rescue_from ActionController::InvalidAuthenticityToken,
        with: :invalid_authenticity_token
    
  
    include ActionController::RequestForgeryProtection
    protect_from_forgery with: :exception
    # skip_before_action :verify_authenticity_token


    before_action :snake_case_params, :attach_authenticity_token
    # skip_forgery_protection

    
    def current_user
        # debugger
        @current_user ||= User.find_by(session_token: session[:session_token])
        @current_user
    end
    helper_method :current_user

    def login!(user)
        # debugger
        session[:session_token] = user.reset_session_token!
        # @current_user = user
    end

    def logout!  ## might need to be logout!(user)
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def logged_in?
        !!current_user
    end

    def require_logged_in
        if !logged_in?
            render json: { errors: ['Must be logged in'] }, status: 401
        end
    end

    def require_logged_out
        if logged_in?
            render json: { errors: ['Must be logged out']}, status: 401
        end
    end
    
    # def test
    #     if params.has_key?(:login)
    #       login!(User.first)
    #     elsif params.has_key?(:logout)
    #       logout!
    #     end
      
    #     if current_user
    #       render json: { user: current_user.slice('id', 'email', 'session_token') }
    #     else
    #       render json: ['No current user']
    #     end
    #   end


    private
    
    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end

    # def handle_brew_exception
    #     render json: ["I can't brew; I'm a teapot!"], status: 418
    # end

    def invalid_authenticity_token
        render json: { message: 'Invalid authenticity token' }, 
          status: :unprocessable_entity
    end
      
    def unhandled_error(error)
        if request.accepts.first.html?
          raise error
        else
          @message = "#{error.class} - #{error.message}"
          @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
          render 'api/errors/internal_server_error', status: :internal_server_error
          
          logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
        end
    end

end
