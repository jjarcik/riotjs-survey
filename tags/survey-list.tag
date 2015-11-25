<survey-list>
    
    <table class="table">             
        
        <tr>
            <th></th>
            <th>Name of the survey</th>
            <th>Main question</th>
        </tr>
        
        <tr each='{item, i in opts.list }' index="{ i }">
            
            <td>
                
                <a href="#survey/{i}" title="detail">
                    <img src="img/glass.png" alt="detail" />
                </a>
                
                <a href="#result/{i}" title="result">
                    <img src="img/chart.gif" alt="detail" />
                </a>
                
            </td>
            
            <td>
                { item.nazev }
            </td>
            
            <td>
                { item.otazka }
            </td>
        </tr>

    </table>
    
</survey-list>