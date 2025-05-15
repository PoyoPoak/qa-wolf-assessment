Starting the assignment, I first decided to take a look at the site and make some mental notes of any constraints I might have, and factors I'll need to take into consideration for when developing a solution.

So, immediately I notice that each page is paginated and only contains the newest 30 articles when I need to check 100 of them. That said, clicking on the "More" button and looking at how the URL changes, I notice that at the end that n is set to 31. However using only n as a method traversal, did not accurately reflect the next page. As a result, I knew I couldn't rely on this. 

Instead I then used playwright's recorder to quickly grab the "More" button element instead using that as a method of page traversal.

Now, I needed to figure out how to extract data from the page. The simplest way would be through the page itself with playwright. While inspecting the page with developer tools in my browser, I noticed all the articles were organized with a table. At the same time, I also noticed all the dates were in contaienrs categorized by the span tag of age. 

Looking closely, I can see that in each time stamp entry, there is a timestamp formatted in a human readable form, as well as a unix time stamp. Aware that unix time stamps are a simple integer, I knew I could do simple comparrisons using them rather than parsing a date string. 

With just about everything I need to know, I began on my solution.

First, we'll establesh a couple variables:
    count is how many articles we want to validate.
    articleTimestamps is an empty list that will be filled with our timestamps we want to compare.

Now, though I could probably compare unix timestamps in place without storing them, this is a much more simpler solution and for minimal storage overhead vs. making the solution overcomplicated for the sake of marginal memory benefits.

While the list is yet to be populated by the 100 time stamps we want to compare, we'll do a loop. This loop will retrieve the time stamps and store them into the list. It'll also proceed to the next page if it still hasn't yet filled.

Once done, the browser will close.

Then we'll loop through the list using a for loop with an iterator. This way we can compare a timestamp to the next timestamp ensuring the first is a larger value. As in with unix time a larger value means it is newer. If any timestamp in the list is smaller than the next however, that would indicate the next is older meaning the articles are not in chronological order from newest to oldest. If that is the case the function will return false and print the result.

If it passes fine, it will return true stating the article is in chronogical order.

That said, this concludes my solution to the problem.

In developing this solution I relied heavily on the playwright online documentation and stackoverflow for as playwright is something I began using just two months ago for another project. 