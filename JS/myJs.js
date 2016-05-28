var module=angular.module('myApp',[]);
 module.controller('myctr', ['$scope', function($scope)
 {
   $scope.str=[];
   $scope.changeStr=function()
   {
     $scope.errorStr="";
     $scope.lejo=true;
     if($scope.referInt==undefined || $scope.referInt<0 || $scope.referInt>10 )
     {
       $scope.lejo=false;
       $scope.errorStr="Nr i futur nuk lejohet";
     }
   }
   $scope.getNrframe=function()
   {
     $scope.errorfr="";
     $scope.lejofr=true;
     if($scope.nrframe<1 || $scope.nrframe>10)
     {
       $scope.lejofr=false;
       $scope.errorfr="Nr i framint nuk lejohet";
     }
   }

   $scope.shto=function()
   {
        $scope.str.push($scope.referInt);
   }


  function indexOfBetween(vlera,ind)
  {
    var index;
    for(var c=0;c<ind;c++)
    {
      if($scope.str[c]==vlera)
      index=c;
    }
    return index;
  }

  function FIFO()
  {
    var count=0;
    var frame=[];
    var nrpagefauld=0;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    c.width= c.width;
    var gjeresi=0;
    var lartesi=0;
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
            nrpagefauld++;
        }
        else
        {
           isfound=true;
        }
         if(count>9)
         {
             count=1;
             gjeresi=0;
             lartesi=lartesi+30*$scope.nrframe+30;
             if(lartesi+30*$scope.nrframe+30>c.height)
             {
               c.height=c.height+30*$scope.nrframe+30;
             }
         }
          ctx.fillText($scope.str[i],gjeresi*100+45,lartesi+25);
          for(var j=0;j<$scope.nrframe;j++)
          {
              if(!isfound)
              {
                   if(frame[j]!=undefined)
                  {
                      ctx.fillText(frame[j],gjeresi*100+45,lartesi+j*30+50);
                  }
                  ctx.rect(gjeresi*100+30,lartesi+j*30+30, 40, 30);
                  ctx.stroke();
              }
              else
              {
                ctx.fillText("|",gjeresi*100+45,lartesi+j*30+50);
              }

          }
              gjeresi++;
          }
      $scope.nrpage="Nr i Page Faulteve= "+nrpagefauld;
  }
  function LRU()
  {
    var count=0;
    var frame=[];
    var nrpagefauld=0;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    c.width= c.width;
    var gjeresi=0;
    var lartesi=0;
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
          nrpagefauld++;
      }
      else
      {
         isfound=true;
      }
         if(count>9)
         {
             count=1;
             gjeresi=0;
             lartesi=lartesi+30*$scope.nrframe+30;
             if(lartesi+30*$scope.nrframe+30>c.height)
             {
               c.height=c.height+30*$scope.nrframe+30;
             }
         }
          ctx.fillText($scope.str[i],gjeresi*100+45,lartesi+25);
          for(var j=0;j<$scope.nrframe;j++)
          {
              if(!isfound)
              {
                   if(frame[j]!=undefined)
                  {
                      ctx.fillText(frame[j],gjeresi*100+45,lartesi+j*30+50);
                  }
                  ctx.rect(gjeresi*100+30,lartesi+j*30+30, 40, 30);
                  ctx.stroke();
              }
              else
              {
                ctx.fillText("|",gjeresi*100+45,lartesi+j*30+50);
              }

          }
              gjeresi++;
      }
      $scope.nrpage="Nr i Page Faulteve= "+nrpagefauld;
  }

  function OPTIMAL()
  {
      var frame=[]; var count=0;
      var nrpagefauld=0;
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      c.width= c.width;
      var gjeresi=0;
      var lartesi=0;
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
            nrpagefauld++;
        }
        else
        {
           isfound=true;
        }
         if(count>9)
         {
            count=1;
             gjeresi=0;
             lartesi=lartesi+30*$scope.nrframe+30;
             if(lartesi+30*$scope.nrframe+30>c.height)
             {
               c.height=c.height+30*$scope.nrframe+30;
             }
         }
          ctx.fillText($scope.str[i],gjeresi*100+45,lartesi+25);
          for(var j=0;j<$scope.nrframe;j++)
          {
              if(!isfound)
              {
                   if(frame[j]!=undefined)
                  {
                      ctx.fillText(frame[j],gjeresi*100+45,lartesi+j*30+50);
                  }
                  ctx.rect(gjeresi*100+30,lartesi+j*30+30, 40, 30);
                  ctx.stroke();
              }
              else
              {
                ctx.fillText("|",gjeresi*100+45,lartesi+j*30+50);
              }

          }
              gjeresi++;
          }
    $scope.nrpage="Nr i Page Faulteve= "+nrpagefauld;
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
  $scope.afisho=function()
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
