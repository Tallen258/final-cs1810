using System.Net.Security;

namespace Taft{
public class Cards
{
    public string id { get; set; }
    public string suite { get; set; }
    public int value { get; set; }

    public Cards(string ID, string Suite, int Value)
    {
        id = ID;
        suite = Suite;
        value = Value;
    }



}
}