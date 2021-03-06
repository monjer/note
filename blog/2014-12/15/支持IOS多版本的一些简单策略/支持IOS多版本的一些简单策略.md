###支持IOS多版本的一些简单策略

每次IOS版本的升级都会造成在一定的时间内新老版本IOS共存的问题，因为不同的用户在选择是否要及时更新设备的IOS版本的问题上，对待的方式不同。有的用户会在发布新版的IOS版本后及时作出更新，
但有的用户则会维持当前状态。新的IOS版本发布后，会带来更多新的功能特性，同时也会造成一些已有API的变动。如，IOS8发布之后一个比较明显的变动便是废除了上大家一直以来用来响应设备旋转的三个方法：

	- (void)willRotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation
                                duration:(NSTimeInterval)duration

	- (void)willAnimateRotationToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
    	                                     duration:(NSTimeInterval)duration

	- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation

因为IOS中引入了**size class**的概念来统一IOS的界面开发，并推荐使用结合**auto layout**来进行界面的布局，所以换之添加了以下实现自`UIContentContainer`协议的

	- (void)viewWillTransitionToSize:(CGSize)size
    	   withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator

方法，来响应界面调整可能会造成的变动：

> Use `viewWillTransitionToSize:withTransitionCoordinator:` to make interface-based adjustments.


在IOS8和低于IOS8版本共存这个时间段内，如果我们的App要发布新的版本，可能需要调整我们代码的实现形式，选择使用新的特性，同时要向前兼容已有的老版本的IOS，来更加完善我们的App的功能，同时也不影响那些设备装有旧版
IOS用户的基本功能。针对**代码层面上**来说，基本的思路是程序运行时，在代码实现上进行代码逻辑的切换，实现切换的判断条件大概有两种：

+ IOS版本检测
+ IOS特性检测

###IOS版本检测

`Fundation framework`的`NSObjeCRuntime.h`文件中包含了所有已发布系统的版本号，同时使用`NSFoundationVersionNumber`宏来保存当前App运行系统的版本
对于IOS设备来说，该头文件中的宏定义如下

	#if TARGET_OS_IPHONE
	#define NSFoundationVersionNumber_iPhoneOS_2_0	678.24
	#define NSFoundationVersionNumber_iPhoneOS_2_1  678.26
	#define NSFoundationVersionNumber_iPhoneOS_2_2  678.29
	#define NSFoundationVersionNumber_iPhoneOS_3_0  678.47
	#define NSFoundationVersionNumber_iPhoneOS_3_1  678.51
	#define NSFoundationVersionNumber_iPhoneOS_3_2  678.60
	#define NSFoundationVersionNumber_iOS_4_0  751.32
	#define NSFoundationVersionNumber_iOS_4_1  751.37
	#define NSFoundationVersionNumber_iOS_4_2  751.49
	#define NSFoundationVersionNumber_iOS_4_3  751.49
	#define NSFoundationVersionNumber_iOS_5_0  881.00
	#define NSFoundationVersionNumber_iOS_5_1  890.10
	#define NSFoundationVersionNumber_iOS_6_0  992.00
	#define NSFoundationVersionNumber_iOS_6_1  993.00
	#define NSFoundationVersionNumber_iOS_7_0 1047.20
	#define NSFoundationVersionNumber_iOS_7_1 1047.25
	#endif

所以检测设备是否是IOS8及以上版本的系统，如下

	// IOS8 system version
	if(NSFoundationVersionNumber > NSFoundationVersionNumber_iOS_7_1){
		// to do for IOS8
	}
对应的检测IOS7版本，如下

	if(NSFoundationVersionNumber > NSFoundationVersionNumber_iOS_6_1 && NSFoundationVersionNumbe <= NSFoundationVersionNumber_iOS_7_1){
		// to do for IOS7
	}
如果要针对某一个特定的IOS版本进行处理(通常情况下是要处理特定版本下的IOS系统本身的bug)，可以直接在条件语句里判断版本号

	if(NSFoundationVersionNumber == NSFoundationVersionNumber_iOS_7_1){
		// to do for ios7.1
	}

依次类推。这样根据不同的系统版本来切换代码逻辑，实现在特定IOS的版本下完成匹配的功能，同时不影响其它IOS版本上的代码实现，保证个版本的代码独立性和完成性。

###IOS特性检测

支持最新版IOS的App，经常会用到新的类型或新的接口，执行特性检测可以避免程序运行期的崩溃问题。例如IOS8发布后，推荐使用`UIAlertController`来
替换原来早期的`UIActionSheet`和`UIAlertView`,这样如果我们的App发布在IOS8时，可以使用使用`UIAlertController`,可以执行以下逻辑判断

	if([UIAlertController class]){
		// to do use UIAlertController

	}else{
		// to do use UIAlertView or UIActionSheet	
	}
判断一个方法是否可用的话，可以使用`NSObject`的`- (BOOL)respondsToSelector:(SEL)aSelector`方法或者使用`+ (BOOL)instancesRespondToSelector:(SEL)aSelector`类方法
如：IOS7之后的UITableView默认会给每个单元格添加一个底部分割线(seperatorLine)，分割线距左侧顶边`15`个点，某些情况下我们需要将该分割线顶边，IOS7下，我们只要设置
`tableView.separatorInset = UIEdgeInsetsZero ;`但IOS8之后`UIView`添加了`layoutMargins`属性来定义视图与子视图的顶边。所以兼容IOS8来移除分割线的顶边，需要添加添加条件
判断

	-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell 
	forRowAtIndexPath:(NSIndexPath *)indexPath{
	{
		if ([tableView respondsToSelector:@selector(setLayoutMargins:)]) {
	        [tableView setLayoutMargins:UIEdgeInsetsZero];
	    }

	    if ([cell respondsToSelector:@selector(setLayoutMargins:)]) {
	        [cell setLayoutMargins:UIEdgeInsetsZero];	       
	    }
	}

>基于C语言的函数，可以通过比较函数名称与NULL值，可以判断函数是否存在
> 
> 		if(UIAccessibilityIsVoiceOverRunning != NULL && UIAccessibilityIsVoiceOverRunning()){
> 		
> 			// VoiceOver is running
> 		}
> 		




以上，完。







###参考
+ [Supporting Multiple Versions of iOS](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/StrategiesforImplementingYourApp/StrategiesforImplementingYourApp.html#//apple_ref/doc/uid/TP40007072-CH5-SW24)
+ [SDK Compatibility Guide](https://developer.apple.com/library/ios/documentation/DeveloperTools/Conceptual/cross_development/Introduction/Introduction.html#//apple_ref/doc/uid/10000163-BCICHGIE)
