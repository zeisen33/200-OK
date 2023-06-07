json.user do
    json.extract! @user, :id, :display_name ## :email, :created_at, :updated_at
end