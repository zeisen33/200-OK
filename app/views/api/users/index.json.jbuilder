json.users do 
    # debugger
    @users.each do |user|
        # debugger
        json.set! user.id do
            json.extract! user, :id, :email, :display_name, :created_at, :updated_at
        end
    end
end