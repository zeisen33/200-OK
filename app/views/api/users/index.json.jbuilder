# debugger
@users.each do |user|
    # debugger
    json.set! user.id do
        json.partial! '/api/users/user', user: user
    end
end
