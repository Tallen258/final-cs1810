using System.Text.Json.Nodes;
using Microsoft.Extensions.Options;
using Taft;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors( p => {p.AllowAnyOrigin(); 
p.WithMethods("GET");
p.AllowAnyHeader();
}
);
app.MapGet("/cards", () =>
{
    List<string> ids = new List<string> { "Ace", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King" };
    List<string> suites = new List<string> { "Spades", "Hearts", "Diamonds", "Clubs" };
    List<int> values = new List<int> { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 };
    List<Cards> createCards(List<string> id, List<string> suite, List<int> value)
    {
        List<Cards> cards = new();

        for (int i = 0; i < 14; i++)
        {
            for (int s = 0; s < 4; s++)
            {
                cards.Add(new Cards(ids[i], suite[s], values[i]));
            }
        }
        return cards;
    }
    List<Cards> cards = createCards(ids,suites,values);
    return cards;
});

app.Run();
