defmodule BackendWeb.MessagesView do
    use BackendWeb, :view

    def render("create.json", %{message: message}) do
        %{
            result: "Message create!",
            message: message
        }
    end
end
