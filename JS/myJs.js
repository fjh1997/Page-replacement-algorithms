var module=angular.module('myApp',[]);
 module.controller('myctr', ['$scope', function($scope)
 {
   $scope.str=[];
   $scope.changeStr=function()
   {
     $scope.errorStr="";
     $scope.enable=true;
     if($scope.referInt==undefined || $scope.referInt<0 || $scope.referInt>10 )
     {
       $scope.enable=false;
       $scope.errorStr="输入错误";
     }
   }
   $scope.getNrframe=function()
   {
     $scope.errorfr="";
     $scope.enablefr=true;
     if($scope.nrframe<1 || $scope.nrframe>10)
     {
       $scope.enablefr=false;
       $scope.errorfr="输入错误";
     }
   }

   $scope.submit=function()
   {
        $scope.str.push($scope.referInt);
   }


  function indexOfBetween(value,ind)
  {
    var index;
    for(var c=0;c<ind;c++)
    {
      if($scope.str[c]==value)
      index=c;
    }
    return index;
  }

  function FIFO()
  {
    var count=0;
    var frame=[];
    var nrpagefault=0;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    c.width= c.width;
    var width=0;
    var height=0;
    var isfound=false;
      for(var i=0;i<$scope.str.length;i++)
      {
         count++;
         isfound=false;
         if(frame.indexOf($scope.str[i])==-1)
         {
            if(frame.length<$scope.nrframe)
            {
                  frame.push($scope.str[i]);
            }
            else
            {
  		            frame.shift();
                  frame.push($scope.str[i]);
            }
            nrpagefault++;
        }
        else
        {
           isfound=true;
        }
         if(count>9)
         {
             count=1;
             width=0;
             height=height+30*$scope.nrframe+30;
             if(height+30*$scope.nrframe+30>c.height)
             {
               c.height=c.height+30*$scope.nrframe+30;
             }
         }
          ctx.fillText($scope.str[i],width*100+45,height+25);
          for(var j=0;j<$scope.nrframe;j++)
          {
              if(!isfound)
              {
                   if(frame[j]!=undefined)
                  {
                      ctx.fillText(frame[j],width*100+45,height+j*30+50);
                  }
                  ctx.rect(width*100+30,height+j*30+30, 40, 30);
                  ctx.stroke();
              }
              else
              {
                ctx.fillText("|",width*100+45,height+j*30+50);
              }

          }
              width++;
          }
      $scope.nrpage="缺页数= "+nrpagefault;
      $scope.nrpage2="缺页率= "+nrpagefault/$scope.str.length*100+"%";
  }
  function LRU()
  {
    var count=0;
    var frame=[];
    var nrpagefault=0;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    c.width= c.width;
    var width=0;
    var height=0;
    var isfound=false;
    for(var i=0;i<$scope.str.length;i++)
    {
       isfound=false; count++;
       if(frame.indexOf($scope.str[i])==-1)
       {
          if(frame.length<$scope.nrframe)
          {
                frame.push($scope.str[i]);
          }
          else
         {
            var min=99; var index;
            for(var c=0;c<frame.length;c++)
             {
                  if(indexOfBetween(frame[c],i) < min)
                  {
                      min=indexOfBetween(frame[c],i);
                      index=c;
                  }
              }
                    frame.splice(index,1);
                    frame.push($scope.str[i]);

          }
          nrpagefault++;
      }
      else
      {
         isfound=true;
      }
         if(count>9)
         {
             count=1;
             width=0;
             height=height+30*$scope.nrframe+30;
             if(height+30*$scope.nrframe+30>c.height)
             {
               c.height=c.height+30*$scope.nrframe+30;
             }
         }
          ctx.fillText($scope.str[i],width*100+45,height+25);
          for(var j=0;j<$scope.nrframe;j++)
          {
              if(!isfound)
              {
                   if(frame[j]!=undefined)
                  {
                      ctx.fillText(frame[j],width*100+45,height+j*30+50);
                  }
                  ctx.rect(width*100+30,height+j*30+30, 40, 30);
                  ctx.stroke();
              }
              else
              {
                ctx.fillText("|",width*100+45,height+j*30+50);
              }

          }
              width++;
      }
      $scope.nrpage="缺页数= "+nrpagefault;
      $scope.nrpage2="缺页率= "+nrpagefault/$scope.str.length*100+"%";
  }

  function OPTIMAL()
  {
      var frame=[]; var count=0;
      var nrpagefault=0;
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      c.width= c.width;
      var width=0;
      var height=0;
      var isfound=false;
      for(var i=0;i<$scope.str.length;i++)
      {
        count++;
         isfound=false;
         if(frame.indexOf($scope.str[i])==-1)
         {
            if(frame.length<$scope.nrframe)
            {
                  frame.push($scope.str[i]);
            }
            else
           {
                var max=-1; var index;
               for(var c=0;c<frame.length;c++)
                {
                     if($scope.str.lastIndexOf(frame[c])<i)
                     {
                       index=c;
                       break;
                     }
                     if($scope.str.lastIndexOf(frame[c]) > max &&  $scope.str.lastIndexOf(frame[c])>i)
                     {
                          max=$scope.str.lastIndexOf(frame[c]);
                           index=c;
                     }
                  }

                 frame.splice(index,1);
                 frame.push($scope.str[i]);

            }
            nrpagefault++;
        }
        else
        {
           isfound=true;
        }
         if(count>9)
         {
            count=1;
             width=0;
             height=height+30*$scope.nrframe+30;
             if(height+30*$scope.nrframe+30>c.height)
             {
               c.height=c.height+30*$scope.nrframe+30;
             }
         }
          ctx.fillText($scope.str[i],width*100+45,height+25);
          for(var j=0;j<$scope.nrframe;j++)
          {
              if(!isfound)
              {
                   if(frame[j]!=undefined)
                  {
                      ctx.fillText(frame[j],width*100+45,height+j*30+50);
                  }
                  ctx.rect(width*100+30,height+j*30+30, 40, 30);
                  ctx.stroke();
              }
              else
              {
                ctx.fillText("|",width*100+45,height+j*30+50);
              }

          }
              width++;
          }
    $scope.nrpage="缺页数= "+nrpagefault;
  }
  $scope.clear=function()
  {
    $scope.str=[];
    $scope.nrframe=undefined;
    $scope.referInt=undefined;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    c.width= c.width;
  }
  $scope.show=function()
   {
     var type=document.getElementById("alg");
     var value = parseInt(type[type.selectedIndex].value);
      switch(value)
       {
               case 1:
                   FIFO();
                   break;
               case 2:
                   OPTIMAL();
                   break;
               case 3:
                   LRU();
                   break;
          }

  }


 }]);
